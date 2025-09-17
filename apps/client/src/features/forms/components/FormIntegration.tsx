import React, { useEffect, useState } from 'react';
import { tools } from '../data/tools';
import { connectGoogleSheet, getNotionDb, getSpreadSheet } from '../service';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useReduxState from '@/hooks/useReduxState';

const FormIntegration = () => {

    const { formId } = useParams();
    const { workspaces } = useReduxState();
    const [spreadSheet, setSpreadSheet] = useState({
        formId: "",
        service: "",
        formName: "Register Form",
        spreadSheetId: "",
        spreadSheetUrl: ""
    });
    const [notionDbData, setNotionDbData] = useState({
        formId: "",
        service: "",
        dbId: "",
        dbName: "",
        dbUrl: ""
    });

    //@ts-ignore
    const res = workspaces.map(item1 => item1?.files.find(item2 => item2.id === formId)).filter(item => item !== undefined)
    console.log("res", res);
    

    const fetchSpreadSheet = async (formId: string) => {
        try {
            const response = await getSpreadSheet(formId!);
            const data = response?.data;
            const { formId: fId, formName, spreadSheetId, spreadSheetUrl } = data;
            setSpreadSheet({ formId: fId, formName, service: "google sheets", spreadSheetId, spreadSheetUrl })
        } catch (error) {
            console.log(error);
        }
    };

    const fetchNotionDb = async (formId: string) => {
        try {
            const response = await getNotionDb(formId);
            const data = response?.data;
            setNotionDbData({ formId: data.formId, dbName: data.notionDbName, dbId: data.notionDbId, dbUrl: data.notionDbUrl, service: "notion"});
        } catch (error) {
            console.log(error);
        }
    };

    const handleConnect = async (tool: { name: string, img: string }) => {
        switch (tool.name) {
            case "google sheets":
                window.location.href = `${import.meta.env.VITE_GOOGLE_SHEET_LOGIN_URL}?formId=${formId}&formName=${encodeURIComponent(res[0].name)}`;
                break;
            case "notion":
                window.location.href = `${import.meta.env.VITE_NOTION_LOGIN_URL}/${formId}/${encodeURIComponent(res[0].name)}`;
                break;
        }
    };

    useEffect(() => {
        fetchSpreadSheet(formId!);
        fetchNotionDb(formId!);
    }, []);

    return (
        <section className='flex flex-col items-center mx-3'>
            {
                spreadSheet.service &&
                <div className='my-5'>
                    <h1 className='text-xl font-semibold'>My connections</h1>
                    <p className='mt-3 text-sm text-gray-700'>Here are all the integrations connected to this form. You can easily enable or disable an integration and track submission sync requests using the event history log.
                    </p>
                </div>
            }
            {
                tools
                    .filter(item => item.name === spreadSheet.service || item.name === notionDbData.service)
                    // .filter(item => item.name === notionDbData.service)
                    .map((item, i) => {
                        return (
                            <div className='flex justify-start items-center gap-3 w-full my-3' key={i} >
                                <img src={item.img} alt={item.name} className='h-10 w-10' />
                                <div className='flex flex-col'>
                                    <div className='flex items-center gap-2'>
                                        <p className='font-semibold'>{item.name === "google sheets" ? spreadSheet.formName : item.name === "notion" ? notionDbData.dbName : ""}</p>
                                        <div className='h-2 w-2 rounded-full bg-green-500'></div>
                                    </div>
                                    <p className='text-xs font-semibold text-gray-500 cursor-pointer'>Submissions are synced with this <span className='underline' onClick={() => window.open(
                                        item.name === "google sheets" ? spreadSheet.spreadSheetUrl : item.name === "notion" ? notionDbData.dbUrl : "", "_blank")}>
                                        {item.name === "google sheets" ? "Spreadsheet" : item.name === "notion" ? "Database" : ""}
                                    </span></p>
                                </div>
                            </div>
                        )
                    })
            }
            <div className='flex flex-col justify-start w-full my-5'>
                <h1 className='text-xl font-semibold'>Discover Integrations</h1>
                <p className='mt-3 text-sm text-gray-700'>Make Tally even more powerful
                    by using these tools. Check out our roadmap for upcoming integrations
                    and to request new ones.
                </p>
            </div>
            {
                tools
                    .filter(item => item.name !== spreadSheet.service && item.name !== notionDbData.service)
                    .map((item, i) => {
                        return (
                            <div className='flex flex-col justify-start w-full my-5' key={i}>
                                <img className='h-10 w-10' src={item.img} alt={`${item.name}`} />
                                <div className='my-3'>
                                    <div className='capitalize font-semibold'>
                                        {item.name}
                                    </div>
                                    <p className='text-sm text-gray-500 font-normal'>
                                        {item.name === "webhooks" ? " Send events for new submissions to HTTP endpoints" : `Send submission to ${item.name}`}
                                    </p>
                                </div>
                                <div className='text-[#0070d7] font-semibold cursor-pointer' onClick={() => handleConnect(item)}>Connect</div>
                            </div>
                        )
                    })
            }
        </section>
    )
}

export default FormIntegration