import React from 'react'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'
import galleryImages from './galleryImages'
export const MasonryImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{350:1, 768:3, 992:4}}>
    <Masonry gutter='1rem'>
        {
            galleryImages.map((item, index) =>(
                <img src={item}
                className='masonry__img'
                key={index}
                style={{width: '100%', display:'block', borderRadius:'10px'}}
                 alt="" />
            ))
        }
    </Masonry>
    </ResponsiveMasonry>
  )
}
