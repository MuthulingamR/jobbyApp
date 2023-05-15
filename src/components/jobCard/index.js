import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="logo-role-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="icons-container">
              <AiFillStar color=" #fbbf24" size={25} />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="package-location-container">
          <div className="location-type-container">
            <div className="icons-container">
              <MdLocationOn color="#f1f5f9" size={20} />
              <p className="icon-name">{location}</p>
            </div>
            <div className="icons-container">
              <BsFillBriefcaseFill color="#f1f5f9" size={20} />
              <p className="icon-name">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="job-card-line" />
        <h1>Description</h1>
        <p className="description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
