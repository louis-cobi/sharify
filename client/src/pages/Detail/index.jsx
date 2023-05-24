import { lazy, Suspense } from "react"
import DetailMediaSkeleton from "../../components/DetailMediaSkeleton"

const DetailMedia = lazy(() => import("../../components/DetailMedia"))

const Detail = () => {
    return (
        <Suspense fallback={<DetailMediaSkeleton />}>
            <DetailMedia />
        </Suspense>
    )
}

export default Detail
