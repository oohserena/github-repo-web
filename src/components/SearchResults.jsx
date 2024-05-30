'use client';

import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useRouter, useSearchParams } from 'next/navigation';
import * as client from "../client";

export default function SearchResults() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [username, setUsername] = useState("");
    const [repoCounts, setRepoCounts] = useState(0);
    const [forkCounts, setForkCounts] = useState(0);
    const [usedLanguageCount, setUsedLanguageCount] = useState("");

    useEffect(() => {
        if (searchParams) {
            const username = searchParams.get('username');
            setUsername(username);
            fetchRepoCounts(username);
            fetchTotalForkCount(username);
            fetchUsedLangugeCount(username);
        }
    }, [searchParams]);

    const fetchRepoCounts = async (username) => {
        try {
            const response = await client.getRepoCounts(username);
            setRepoCounts(response);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    }

    const fetchTotalForkCount = async (username) => {
        try {
            const response = await client.getTotalForkCount(username);
            setForkCounts(response);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    }

    const fetchUsedLangugeCount = async (username) => {
        try {
            const response = await client.getUsedLanguageCount(username);
            const filteredLanguages = response.filter(language => language !== 'null');
            setUsedLanguageCount(filteredLanguages);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    }

    return (
        <div>
            <SearchBar />
            <div className="mt-8">
                <h2 className="text-2xl font-bold"> {username} - Repository Statistics</h2>
                <ul>
                    <li>Repositories: {repoCounts}</li>
                    <li>Total Forks: {forkCounts}</li>
                    <li>
                        Used Languages (sorted from most used to least used):
                        
                        {Array.isArray(usedLanguageCount) ? (
                            <ul className="flex flex-wrap gap-2">
                                {usedLanguageCount.map((language, index) => (
                                    <li key={index}>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{language}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );

}