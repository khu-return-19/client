import Header from "components/Header/Header"

function ServiceIntroductionLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default ServiceIntroductionLayout