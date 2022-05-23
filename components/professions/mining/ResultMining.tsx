import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import style from './ResultMiningStyle.module.css'

import styles from '@components/layout.module.css'
import { useEffect, useState } from 'react'

export default function ResultMining() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])

  return (
    <>
      <div className={`${!isLoading && style.loadedMining}`}>
        <div className={`overlay ${style.preLoaderMining}`}>
          <div className={style.preloaderFoldingCube}>
            <div className={`${style.preloaderCube1} ${style.preloaderCube}`}></div>
            <div className={`${style.preloaderCube2} ${style.preloaderCube}`}></div>
            <div className={`${style.preloaderCube4} ${style.preloaderCube}`}></div>
            <div className={`${style.preloaderCube3} ${style.preloaderCube}`}></div>
          </div>
        </div>
      </div>

      <div className={`${style.frameFinished}`}>
        <div className={style.questFinish}></div>
        <div></div>
        <div className={style.resultMining}>
          <div className={style.title}>You Got</div>
          <div className={style.items}>
            <span>X5</span>
          </div>
        </div>
        <div className={style.helpText}>All the Ores you mine will be stored in your inventory</div>
        <Link className={style.linkContainer} href="/professions/openian/main">
          <a className={`${style.confirmBtn} click-cursor`}></a>
        </Link>
      </div>
    </>
  )
}
