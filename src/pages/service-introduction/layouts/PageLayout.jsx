import Header from "components/Header/Header"

function PageLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="px-[120px]">
                {children}
            </div>
        </div>
    )
}

export default PageLayout