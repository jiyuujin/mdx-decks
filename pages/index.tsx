import React from 'react'
import Head from 'next/head'
import fs from 'fs'
import styles from '../static/Home.module.css'

export default function Home({ allFileNames }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello, <a href="https://yuma-kitamura.nekohack.me">Yuma Kitamura!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/slide</code>
        </p>

        <div className={styles.grid}>
          {allFileNames.map((fileName: string) => {
            return (
              <a
                key={fileName}
                href={`/slide/${fileName.match(/([^/]*)\./)[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <h3>{fileName.match(/([^/]*)\./)[1]}</h3>
                <p>{fileName}</p>
              </a>
            )
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://nekohack.me" target="_blank" rel="noopener noreferrer">
          Powered by <img src="/nekohack.svg" alt="nekohack Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const dirPath = 'pages/slide'
  const allDir = fs.readdirSync(dirPath, { withFileTypes: true })
  const allFileNames = allDir
    .filter((dirent) => dirent.isFile())
    .filter(({ name }) => name !== '.DS_Store')
    .map(({ name }) => name)
  return {
    props: { allFileNames: allFileNames },
  }
}
