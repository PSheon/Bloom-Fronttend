// ** Third Party Imports
import { ImageResponse } from '@vercel/og'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

export const config = {
  runtime: 'edge'
}

export default async function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 40,
          color: 'black',
          background: '#FFF',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <svg
          width={256}
          height={256}
          fill='none'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            filter: 'drop-shadow(rgba(109, 120, 141, 0.1) 3px 5px 2px)'
          }}
        >
          <path
            d='M17,9a4.08,4.08,0,0,0-.93.12,5,5,0,0,0-9,2.09A3,3,0,1,0,6,17H17a4,4,0,0,0,0-8Z'
            style={{
              fill: 'rgb(102, 108, 255)',
              stroke: 'rgba(109, 120, 141, 0.1)',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: 1
            }}
          />
        </svg>

        <h1 style={{ fontWeight: 900 }}>{themeConfig.templateName}</h1>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
