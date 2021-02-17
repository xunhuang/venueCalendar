const cheerio = require('cheerio');
import * as Email from './Email';

import * as CloudDB from './CloudDB';

const JobExecStatus = {
    UNKNOWN: "pending",
    SUCCESS: "success",
    FAIL: "failed",
}

function computeUnfinishedJobs(
    allJobs: CloudDB.DataRecord[],
    successIds: string[],
): CloudDB.DataRecord[] {
    var successIdsMap = successIds.reduce(function (map, obj) {
        map[obj] = true;
        return map;
    }, {});

    let unfinished = [];
    for (const job of allJobs) {
        if (!successIdsMap[job.key]) {
            unfinished.push(job);
        }
    }
    return unfinished;
}

function getSuccessfulJobs(jobStatusTable: object): string[] {
    let successIds = [];
    for (const key in jobStatusTable) {
        if (jobStatusTable[key] === JobExecStatus.SUCCESS) {
            successIds.push(key);
        }
    }
    return successIds;
}

async function fetchJobsStatus(tablename: string): Promise<string[]> {
    return await CloudDB.getJobStatusTable(tablename);
}


function list_deep_dedup(list) {
    return list.reduce((r, i) =>
        !r.some(j => !Object.keys(i).some(k => i[k] !== j[k])) ? [...r, i] : r
        , [])
}

type ReducerOptions = {
    verbose?: false,
    jobTableName?: string;
}

type ReducerFunction = (content: string | null, preresult: string) => string;

class ReducerJob {
    name: string;
    srctablename: string;
    outputTable: string;
    jobTableName: string | null = null;
    options: ReducerOptions | null = null;
    verbose: false;
    process: ReducerFunction;

    constructor(
        name: string,
        srctablename: string,
        outputTable: string,
        process: ReducerFunction,
        options: ReducerOptions | null = null
    ) {
        this.name = name;
        this.srctablename = srctablename;
        this.outputTable = outputTable;
        this.process = process;
        if (options) {
            if (options.verbose) this.verbose = options.verbose;
            if (options.jobTableName) this.jobTableName = options.jobTableName;
        }
        if (!this.jobTableName) {
            this.jobTableName = `${this.name}-${this.srctablename}-${this.outputTable}`;
        }
    }

    async execute() {
        let jobStatusTable = await fetchJobsStatus(this.jobTableName);
        let successIds = getSuccessfulJobs(jobStatusTable);
        let allJobs = await CloudDB.getFullRecords(this.srctablename);
        let records = computeUnfinishedJobs(allJobs, successIds);

        var initialresult = await CloudDB.getLastRecord(this.outputTable) as string;
        var previousresults = initialresult;
        var succesfulruns = [];
        for (const record of records) {
            console.log("working on:", record.key);
            try {
                let data = await record.fetchData();
                previousresults = await this.process(data, previousresults);
                succesfulruns.push(record.key);
            } catch (error) {
                console.log("error on:", record.key);
                console.log(error);
            }
        }

        if (previousresults !== initialresult) {
            // persist the new results. 
            await CloudDB.saveInfoAtSystem(this.outputTable, previousresults);
        }

        if (succesfulruns.length > 0) {
            for (const job of succesfulruns) {
                jobStatusTable[job] = JobExecStatus.SUCCESS;
            }
            await CloudDB.saveJobStatusTable(this.jobTableName, jobStatusTable);
        }
        console.log("done with reducer")
    }
}


const ReducerJobs = [
    new ReducerJob(
        "CA Vaccine Reducer",
        "testoutput",
        "Calfiornia-Vaccine-finaloutput",
        (content: string, preresult: string | null): string => {
            let result = preresult ?
                JSON.parse(preresult) : [];
            let input = JSON.parse(content);
            for (const entry of input) {
                result.push({
                    fips: entry.fips,
                    county: entry.county,
                    date: entry.date,
                    doses_administered: entry.doses_administered,
                    population: entry.population,
                    new_doses_administered: entry.new_doses_administered,
                    doses_administered_per_100k: entry.doses_administered_per_100k,
                }
                )
            }
            result = list_deep_dedup(result);
            console.log("so far length is :" + result.length);
            return JSON.stringify(result);
        },
        {
            jobTableName: "California-Reducer",
        }

    )];

async function executeReducers(jobs: ReducerJob[]) {
    let errors = [];
    for (const job of jobs) {

        try {
            console.log(job);
            await job.execute();
        } catch (err) {
            console.log(err);
            console.log("Error but soldier on....");
        }

    }
    if (errors.length > 0) {
        await Email.send(
            ["xhuang@gmail.com"],
            `Reducer Execution: ${errors.length} from latest run`,
            JSON.stringify(errors, null, 2)
        );
    }
}

async function doit() {
    await executeReducers(ReducerJobs);
    // await testreducer();
}

doit()
