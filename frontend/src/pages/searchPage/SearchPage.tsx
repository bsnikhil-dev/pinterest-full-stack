import type React from "react"
import { useSearchParams } from "react-router"
import Gallery from "../../components/gallery/Gallery";

const SearchPage = (): React.ReactElement => {

    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const collectionId = searchParams.get("collectionId");

    return (
        <Gallery searchQuery={query as string} collectionId={collectionId as string} />
    )
}

export default SearchPage