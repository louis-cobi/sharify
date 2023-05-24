import "./index.css"

const DetailMediaSkeleton = () => {
    return (
        <div className="skeleton-media__wrapper">
            <div className="skeleton-media__image"></div>
            <div className="skeleton-media__title"></div>
            <div className="media__types">
                <div className="skeleton-media__types__title"></div>
                <div className="media__types__items">
                    <div className="skeleton-media__types__item"></div>
                    <div className="skeleton-media__types__item"></div>
                </div>
            </div>
            <div className="skeleton-media__btn"></div>
            <div className="skeleton-media__overview">
                <div className="skeleton-media__overview__title"></div>
                <div className="skeleton-media__overview__description"></div>
                <div className="skeleton-media__overview__description"></div>
                <div className="skeleton-media__overview__description"></div>
                <div className="skeleton-media__overview__description"></div>
            </div>
        </div>
    )
}

export default DetailMediaSkeleton