'use client';

import NavButton from "@/components/nav-button";

import styles from "./page.module.scss";

export default function About() {
  return (
    <main className={styles.main}>
      <div className="grid">
        <div className="col">
          
          <h1 className={styles.heading}>
            You&apos;re on the about page
          </h1>
          
          <NavButton href="/">
            Go to home page
          </NavButton>
          
        </div>
      </div>
    </main>
  );
}
