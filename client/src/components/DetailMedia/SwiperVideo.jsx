import { useEffect, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import tmdbConfigs from "../../api/tmdb.config"
import "swiper/css"

const MediaVideo = ({ video }) => {
    const iframeRef = useRef();
  
    useEffect(() => {
      console.log("ifram");
    //   const height = iframeRef.current.offsetWidth * 9 / 16 + "px";
    //   iframeRef.current.setAttribute("height", height);
    }, [video]);
  
    return (
        <iframe
          key={video.key}
          src={tmdbConfigs.youtubePath(video.key)}
          ref={iframeRef}
          width="100%"
          title={video.id}
          style={{ border: 0 }}
        ></iframe>
    );
  };
  

const SwiperVideo = ({ children }) => {
    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                //modules={[Pagination]}
                className="mySwiper"
            >
                {children &&
                    children.map((child) => {
                        return (
                            <SwiperSlide key={child.key}>
                                <MediaVideo video={child} />
                            </SwiperSlide>
                        )
                    })}
            </Swiper>
        </>
    )
}

export default SwiperVideo
