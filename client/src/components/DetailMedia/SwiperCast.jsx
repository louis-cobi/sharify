import { Swiper, SwiperSlide } from "swiper/react"
import tmdbConfigs from "../../api/tmdb.config"
import "swiper/css"

const MediaCast = ({ cast }) => {
    return (
        <div>
            <img
                src={tmdbConfigs.posterPath(cast.profile_path)}
                alt={cast.name}
                style={{ width: "100px" }}
            />
            <p>{cast.name}</p>
        </div>
    )
}

const SwiperCast = ({ children }) => {
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
                    children.map((child, i) => {
                        return (
                            <SwiperSlide key={i++}>
                                <MediaCast cast={child} />
                            </SwiperSlide>
                        )
                    })}
            </Swiper>
        </>
    )
}

export default SwiperCast
