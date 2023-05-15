import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import SimilarJobCard from '../SimilarJob'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    skillsList: [],
    jobsDetails: {},
    similarJobsList: [],
  }

  componentDidMount() {
    this.getJobDetailsData()
  }

  getFormattedData = each => ({
    companyLogoUrl: each.company_logo_url,
    companyWebsiteUrl: each.company_website_url,
    employmentType: each.employment_type,
    id: each.id,
    jobDescription: each.job_description,
    location: each.location,
    packagePerAnnum: each.package_per_annum,
    rating: each.rating,
    title: each.title,
    skills: each.skills,
    lifeAtCompany: each.life_at_company,
    similarJobs: each.similar_jobs,
  })

  getJobDetailsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedJobDetails = this.getFormattedData(data.job_details)
      const updatedSimilarJobs = data.similar_jobs.map(each =>
        this.getFormattedData(each),
      )

      const {skills} = updatedJobDetails
      const updatedSkills = skills.map(eachSkills => ({
        name: eachSkills.name,
        imageUrl: eachSkills.image_url,
      }))

      console.log(updatedSkills)
      console.log(updatedSimilarJobs)
      console.log(updatedJobDetails)

      this.setState({
        apiStatus: apiStatusConstants.success,
        skillsList: updatedSkills,
        jobsDetails: updatedJobDetails,
        similarJobsList: updatedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getJobDetailsData()
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-details-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.onClickRetry} className="failure-btn">
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {skillsList, jobsDetails, similarJobsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      location,
      jobDescription,
      packagePerAnnum,
      lifeAtCompany,
      rating,
      title,
    } = jobsDetails
    const lifeAtCompanyData = {
      description: lifeAtCompany.description,
      imageUrl: lifeAtCompany.image_url,
    }
    return (
      <>
        <div className="job-details-container">
          <div className="job-details-company-logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-company-logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="job-rating-container">
                <AiFillStar color="#fbbf24" size={20} />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-location-package-container">
            <div className="job-location-type-container">
              <div className="job-icon-container">
                <MdLocationOn color="#f1f5f9" size={20} />
                <p className="job-icon-name">{location}</p>
              </div>
              <div className="job-icon-container">
                <BsFillBriefcaseFill color="#f1f5f9" size={20} />
                <p className="job-icon-name">{employmentType}</p>
              </div>
            </div>
            <p className="job-package">{packagePerAnnum}</p>
          </div>
          <hr className="job-line" />
          <div className="description-visit-link-container">
            <h1 className="job-heading">Description</h1>
            <a className="job-link" href={companyWebsiteUrl}>
              Visit <FiExternalLink />
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="job-heading">Skills</h1>
          <ul className="job-skill-ul-container">
            {skillsList.map(eachSkill => (
              <li key={eachSkill.name} className="skill-li-container">
                <img
                  src={eachSkill.imageUrl}
                  className="skill-logo"
                  alt={eachSkill.name}
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="job-description">{lifeAtCompanyData.description}</p>
            <img
              src={lifeAtCompanyData.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="similar-job-ul-container">
          {similarJobsList.map(eachJob => (
            <SimilarJobCard key={eachJob.id} similarJobDetails={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  renderApiStatusDetail = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-full-details-container">
          {this.renderApiStatusDetail()}
        </div>
      </>
    )
  }
}

export default JobDetails
