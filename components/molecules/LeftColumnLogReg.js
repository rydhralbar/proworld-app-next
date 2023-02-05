import style from '@/styles/components/LeftColumn.module.scss'
import Image from 'next/image'
import proworldLogo from '@/public/images/proworld-logo.png'
import Link from 'next/link'

const LeftColumn = () => {
  return (
    <div>
      <div className={style.leftCol}>
            <div className={style.overlay} />
            <div className={style.content}>
              <Link className={style.appLogo} href="/">
                <Image src={proworldLogo}/>
              </Link>
              <h1 className={style.sloganText}>
              Find the best & talented developers in various fields of expertise
              </h1>
            </div>
          </div>
    </div>
  )
}

export default LeftColumn