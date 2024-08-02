// ** Third-Party Imports
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
          flexDirection: 'column',
          fontSize: 40,
          color: 'black',
          background: '#F7F7F9',
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
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          viewBox='0 0 256 256'
          xmlSpace='preserve'
          style={{
            filter: 'drop-shadow(rgba(109, 120, 141, 0.1) 3px 5px 2px)'
          }}
        >
          <rect x={0} y={0} width='100%' height='100%' fill='transparent' />
          <g transform='matrix(0.25 0 0 0.25 128 128)'>
            <path
              style={{
                stroke: 'rgba(109, 120, 141, 0.1)',
                strokeWidth: 0,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: 'rgb(102, 108, 255)',
                fillRule: 'nonzero',
                opacity: 1
              }}
              vectorEffect='non-scaling-stroke'
              transform=' translate(-1210.12, -707.64)'
              d='M 1596.45 793.46 C 1593.53 581.6800000000001 1417.89 410.41 1206.1 412.57000000000005 C 1134.53 413.30000000000007 1067.6299999999999 433.49000000000007 1010.4199999999998 468.1 L 848.36 235.8 C 840.79 224.95000000000002 823.75 230.31 823.75 243.54000000000002 L 823.75 777.8 L 824.27 778.75 C 823.93 785.43 823.75 792.15 823.75 798.91 C 823.75 1012.3 996.73 1185.28 1210.12 1185.28 C 1425.32 1185.29 1599.43 1009.35 1596.45 793.46 z M 1402.21 1079.43 C 1402.1100000000001 1085.4 1389.66 1087.7 1386.32 1082.74 L 1306.8999999999999 964.82 C 1278.4799999999998 981.44 1245.4299999999998 991 1210.12 991 C 1101.4899999999998 991 1013.9199999999998 900.83 1018.1799999999998 791.25 C 1022.0099999999999 692.8 1101.4199999999998 612.23 1199.8199999999997 607.09 C 1307.2399999999998 601.48 1396.6599999999996 684.1700000000001 1401.9699999999998 789.04 L 1402.2199999999998 789.49'
              strokeLinecap='round'
            />
          </g>
        </svg>

        <div
          style={{
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            marginTop: 16,
            padding: '0 120px',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap'
          }}
        >
          {themeConfig.templateName}
        </div>
        <div
          style={{
            fontSize: 24,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            color: '#6E7491',
            marginTop: 0,
            padding: '0 120px',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap'
          }}
        >
          Decentralized RWA Trade Desk
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  )
}
