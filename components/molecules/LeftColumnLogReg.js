import style from '@/styles/components/LeftColumn.module.scss'
import Image from 'next/image'
import proworldLogo from '@/public/images/proworld-logo.png'

const LeftColumn = () => {
  return (
    <div>
      <div className={style.leftCol}>
            <div className={style.overlay} />
            <div className={style.content}>
              <div className={style.appLogo}>
               <Image src={proworldLogo}/>
              </div>
              <h1 className={style.sloganText}>
              Find the best & talented developers in various fields of expertise
              </h1>
            </div>
          </div>
    </div>
  )
}

export default LeftColumn