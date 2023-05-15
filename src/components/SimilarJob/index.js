import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-container">
      <div className="similar-logo-rating-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-logo"
        />
        <div>
          <h1 className="similar-job-title">{title}</h1>
          <div className="similar-rating-container">
            <AiFillStar color="#fbbf24" size={20} />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-heading">Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="similar-logo-icon-container">
        <div className="similar-icon-container">
          <MdLocationOn color="#f1f5f9" size={20} />
          <p className="similar-icon-name">{location}</p>
        </div>
        <div className="similar-icon-container">
          <BsFillBriefcaseFill color="#f1f5f9" size={20} />
          <p className="similar-icon-name">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
