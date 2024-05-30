'use client'

import React from 'react';
import { BrowserRouter } from "react-router-dom";
import SearchResults from "@/components/SearchResults";

export default function Page () {
    return (
        <BrowserRouter>
            <div className="bg-white min-h-screen flex items-center justify-center">
                <SearchResults />

            </div>
            
        </BrowserRouter>
    );
}