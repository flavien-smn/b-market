"use client";

import Link, {LinkProps} from "next/link";
import React from "react";
import {router} from "next/client";

interface TransitionLinkProps extends LinkProps {
    children: React.ReactNode;
    href: string;
}

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const LinkTransition = ({children, href, ...props}: TransitionLinkProps) => {

    const handleTransition = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        const body = document.querySelector("body");

        body?.classList.add("page-transition");

        await sleep(500);
        router.push(href);
        await sleep(500);

        body?.classList.remove("page-transition");
    };

    return (
        <Link {...props} href={href} onClick={handleTransition}>
            {children}
        </Link>
    );
};