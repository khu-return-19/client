import Header from "components/Header/Header"

function PageLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="max-[1440px]:px-[120px] min-[1441px]:px-[calc((100vw-1440px)/2+120px)] max-[768px]:px-[max(20px,calc((100vw-492px)/2))]">
                {children}
            </div>
        </div>
    )
}

export default PageLayout