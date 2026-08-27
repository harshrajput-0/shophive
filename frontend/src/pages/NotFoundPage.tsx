import Button from "../components/ui/Button"

const NotFoundPage = () => {
  return (
    <div className="text-center py-25 px-5">
        <h1 className="font-display text-[4rem] text-primary font-black font-serif mb-2.5">404</h1>
        <p className="text-muted mb-7">This page wandered off the hive.</p>
        <Button as="link" to="/" variant="primary"> <span className="text-bg">Bact to Home</span></Button>

    </div>
  )
}


export default NotFoundPage