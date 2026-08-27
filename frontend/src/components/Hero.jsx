import Button from "./ui/Button"

const hexBase = 'absolute flex h-[126px] w-[110px] items-center justify-center font-display text-[2rem] font-bold [clip-path:polygon(25%_3%,75%_3%,100%_50%,75%_97%,25%_97%,0%_50%)]';


const Hero = () => {
  return (
       <div className="relative grid grid-cols-1 items-center gap-5 py-17.5 pb-19 md:grid-cols-[1.15fr_.85fr]">
        <div>
          <span className="mb-5 inline-flex items-center gap-2 text-[.8rem] font-bold tracking-[.12em] text-primary uppercase">
            ⬡ Small-batch, hive to home
          </span>
          <h1 className="mb-5.5 max-w-160 font-display text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.1] font-semibold text-text">
            Honey, in every<br />
            <em className="text-primary not-italic">form you crave</em>.
          </h1>
          <p className="mb-8.5 max-w-120 text-[1.15rem] leading-[1.7] text-text-secondary">
            From raw jars to honey-infused skincare and gifting sets — everything here starts with real honey, nothing else.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Button as="link" to="/shop">Browse the Hive</Button>
            <Button variant="ghost" as="link" to="/shop">Our Story</Button>
          </div>
        </div>

        <div className="relative hidden items-center justify-center justify-self-center md:flex">
          <div className="relative h-65 w-57.5">
            <div className={`${hexBase} top-0 left-15 bg-primary text-primary-foreground`}>🍯</div>
            <div className={`${hexBase} top-18.75 left-0 border border-border-strong bg-surface-3 text-primary`}>⬡</div>
            <div className={`${hexBase} top-18.75 left-30 border border-border-strong bg-surface-3 text-primary`}>✦</div>
            <div className={`${hexBase} top-37.5 left-15 border border-border-strong bg-bg-tertiary text-[1.4rem] text-text-secondary`}>🌾</div>
          </div>
        </div>
      </div>
  )
}

export default Hero