import Head from 'next/head'
import { useCallback, useRef } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import style from '@components/worldmap/worldMap.module.css'
import Navigation from '@components/worldmap/Navigation'
import Shop, { ShopRef } from '@components/Shop'
import WorldMenu from '@components/worldmap/WorldMenu'

export default function Home() {
  const transformWrapper = useRef(null)
  const shopRef = useRef<ShopRef>()

  const checkWhenZoom = useCallback(() => {
    transformWrapper.current.centerView()
  }, [])

  const handleOpenShop = useCallback(() => {
    shopRef.current?.open()
  }, [])

  return (
    <>
      <Head>
        <title>World Map</title>
      </Head>

      <div className={`${style.worldMapOverlay} overlay`}>
        <TransformWrapper
          ref={transformWrapper}
          maxScale={2.5}
          minScale={1}
          initialScale={1}
          centerZoomedOut={true}
          minPositionX={100}
          limitToBounds={true}
          minPositionY={0}
          maxPositionY={100}
          centerOnInit={true}
          onZoomStop={checkWhenZoom}
        >
          <TransformComponent
            wrapperStyle={{ height: '100vh', width: '100vw' }}
          >
            <div className={style.worldMapContainer}>
              <Navigation />
            </div>
            {/* @ts-ignore */}
            <Shop ref={shopRef} />
          </TransformComponent>
        </TransformWrapper>
        <WorldMenu onOpenShop={handleOpenShop} />
      </div>
    </>
  )
}
