'use client';

import NavButton from "@/components/nav-button";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="grid">
        <div className="col">

          <h1 className={styles.heading}>
            Hello World
          </h1>

          <NavButton href="/about">
            Go to about page
          </NavButton>
          
        </div>
      </div>
    </main>
  );
}
