import { Link } from "react-router-dom"
import Button from "../components/common/Button"

const NotFoundPage = () => {
  return (
    <div className="text-center py-25 px-5">
        <h1 className="font-display text-[4rem] text-primary font-black font-serif mb-2.5">404</h1>
        <p className="text-muted mb-7">This page wandered off the hive.</p>
        <Button as="link" to="/" variant="primary">Back to Home</Button>

    </div>
  )
}


export default NotFoundPage