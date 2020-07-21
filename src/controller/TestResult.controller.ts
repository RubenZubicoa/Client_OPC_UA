import { Request, Response} from 'express';
import { TestResult } from '../models/Test_Result';
import { getConnection } from 'typeorm';

export async function getResults(req:Request, res:Response):Promise<Response>{
    try {
        const data = await getConnection()
        .createQueryBuilder()
        .select('TestResult')
        .from(TestResult, 'TestResult')
        .where('TestResult.Date >= :fecha1 and TestResult.Date <= :fecha2', {fecha1:req.params.fecha1, fecha2:req.params.fecha2})
        .getMany()
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).send(error);
    }
}