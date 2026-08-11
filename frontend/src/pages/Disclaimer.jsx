const P = ({ children }) => {
    return(
    <p className='text-text-secondary mb-4 text-[1.05rem] leading-[1.8]'>{children}</p>
    )
}

const Disclaimer = () => {
    return (
        <div className="max-w-3xl mx-auto my-0">
            <h1 className="font-display text-[clamp(2.2rem,4vw,3rem)] text-text mb-6 font-black">Disclaimer</h1>
 <P> The information provided on Shophive is intended for general informational and shopping purposes. While we make reasonable efforts to keep product descriptions, specifications, pricing, availability, and other information accurate and up to date, errors or omissions may occasionally occur. </P>
<P> Product images are provided for illustrative purposes and may not always exactly represent the actual product. Colors, dimensions, packaging, and other visual details may vary depending on your device, display settings, manufacturer updates, or product availability. </P>
<P> Prices, discounts, promotions, offers, product availability, and other commercial information are subject to change without prior notice. A product being displayed on the website does not guarantee that it will remain available or that the displayed price will remain unchanged. </P>
<P> Product information, specifications, features, warranties, and compatibility details may be provided by manufacturers, vendors, or other third parties. Customers should review the manufacturer's information and applicable product documentation before making a purchase where necessary. </P>
       
        </div>
    )
}

export default Disclaimer