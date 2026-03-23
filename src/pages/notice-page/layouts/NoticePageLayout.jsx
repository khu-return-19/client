import Header from "components/Header/Header"

function PageLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="w-full flex justify-center pt-[64px]">
                {children}
            </div>
        </div>
    )
}

export default PageLayout