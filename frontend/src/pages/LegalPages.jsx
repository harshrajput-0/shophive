const P = ({ children }) => {
    return (
        <p className='text-text-secondary mb-4 text-[1.05rem] leading-[1.8]'>{children}</p>
    )
}


export const AboutPage = () => {
    return (
        <div className="max-w-3xl mx-auto my-0">
            <h1 className="font-display text-[clamp(2.2rem,4vw,3rem)] text-text mb-6 font-black">Return Policy</h1>
            <P>Shophive started as a single hillside apiary and a simple idea: honey shouldn't travel through five hands before it reaches your table. We work directly with a small group of independent beekeepers and honey-goods makers, and every listing here is traceable back to the person who made it.</P>
            <P>We don't blend, cut, or heat-process what we sell. If a jar says raw, it was never heated above hive temperature. If a soap says honey, honey is in the first five ingredients, not the last.</P>
            <P>This is a demo storefront built to show what a real Shophive marketplace could feel like — every account, order, and inventory change you make here lives only in your browser session.</P>
        </div>
    )
}

export const DisclaimerPage = () => {
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

export const ReturnPolicyPage = () => {
    return (
        <div className="max-w-3xl mx-auto my-0">
            <h1 className="font-display text-[clamp(2.2rem,4vw,3rem)] text-text mb-6 font-black">Return Policy</h1>
            <P>Unopened jars, sealed skincare items, and gift boxes can be returned within 14 days of delivery for a full refund.</P>
            <P>Because honey is a food product, opened jars and tasted items can't be returned for hygiene reasons — if something arrives damaged or incorrect, we'll replace it at no cost.</P>
            <P>To start a return, reach out from your Profile page with the order number and reason, and a vendor will follow up with next steps.</P>
        </div>
    )
}



