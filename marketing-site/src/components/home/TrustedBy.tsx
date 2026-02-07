"use client";

import React from "react";
import Image from "next/image";

const TrustedBy: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-950 py-16 sm:py-24 border-y border-gray-100 dark:border-gray-800">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                    Trusted by forward-thinking teams at
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-6">
                    {/* Google */}
                    <div className="col-span-2 lg:col-span-1 flex justify-center">
                        <img
                            className="max-h-8 w-full object-contain dark:brightness-0 dark:invert transition-all opacity-80 hover:opacity-100 grayscale hover:grayscale-0"
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                            alt="Google"
                        />
                    </div>

                    {/* Meta */}
                    <div className="col-span-2 lg:col-span-1 flex justify-center">
                        <img
                            className="max-h-8 w-full object-contain dark:brightness-0 dark:invert transition-all opacity-80 hover:opacity-100 grayscale hover:grayscale-0"
                            src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
                            alt="Meta"
                        />
                    </div>

                    {/* AWS */}
                    <div className="col-span-2 lg:col-span-1 flex justify-center">
                        <img
                            className="max-h-12 w-full object-contain dark:brightness-0 dark:invert transition-all opacity-80 hover:opacity-100 grayscale hover:grayscale-0"
                            src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                            alt="AWS"
                        />
                    </div>

                    {/* Pinterest */}
                    <div className="col-span-2 lg:col-span-1 flex justify-center">
                        <img
                            className="max-h-8 w-full object-contain dark:brightness-0 dark:invert transition-all opacity-80 hover:opacity-100 grayscale hover:grayscale-0"
                            src="https://upload.wikimedia.org/wikipedia/commons/3/35/Pinterest_Logo.svg"
                            alt="Pinterest"
                        />
                    </div>

                    {/* Spotify */}
                    <div className="col-span-2 lg:col-span-1 flex justify-center">
                        <img
                            className="max-h-8 w-full object-contain dark:brightness-0 dark:invert transition-all opacity-80 hover:opacity-100 grayscale hover:grayscale-0"
                            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
                            alt="Spotify"
                        />
                    </div>

                    {/* Figma */}
                    <div className="col-span-2 lg:col-span-1 flex justify-center">
                        <img
                            className="max-h-8 w-full object-contain dark:brightness-0 dark:invert transition-all opacity-80 hover:opacity-100 grayscale hover:grayscale-0"
                            src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
                            alt="Figma"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustedBy;
