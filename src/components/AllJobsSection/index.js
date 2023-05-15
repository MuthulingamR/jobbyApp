import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Profile from '../profile'
import JobCard from '../jobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class AllJobsSection extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    activeEmploymentId: '',
    activeSalaryRangId: '',
    searchInput: '',
    finalSearchValue: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeEmploymentId,
      activeSalaryRangId,
      finalSearchValue,
    } = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentId}&minimum_package=${activeSalaryRangId}&search=${finalSearchValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      console.log(updatedData)
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeCheckBox = event => {
    this.setState({activeEmploymentId: event.target.value}, this.getJobsList)
  }

  onChangeRadio = event => {
    this.setState({activeSalaryRangId: event.target.value}, this.getJobsList)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    const {searchInput} = this.state
    this.setState(
      {finalSearchValue: searchInput, searchInput: ''},
      this.getJobsList,
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.setState(
      {
        apiStatus: apiStatusConstants.initial,
        activeEmploymentId: '',
        activeSalaryRangId: '',
        searchInput: '',
        finalSearchValue: '',
        jobsList: [],
      },
      this.getJobsList,
    )
  }

  renderFilterView = () => {
    const {searchInput, activeSalaryRangId} = this.state

    return (
      <div className="jobs-filter-container">
        <div className="mobile-input-container">
          <input
            type="search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            className="search-input"
          />
          <button
            type="button"
            onClick={this.onClickSearchIcon}
            data-testid="searchButton"
            className="search-button"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <Profile />
        <hr className="filter-line" />
        <h1 className="filter-heading">Type of Employment</h1>
        <ul className="ul-filter-list-container">
          {employmentTypesList.map(each => (
            <li key={each.employmentTypeId}>
              <input
                type="checkbox"
                className="input-checkbox"
                value={each.employmentTypeId}
                onClick={this.onChangeCheckBox}
                id={each.employmentTypeId}
              />
              <label className="input-label" htmlFor={each.employmentTypeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="filter-line" />
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="ul-filter-list-container">
          {salaryRangesList.map(each => (
            <li key={each.salaryRangeId}>
              <input
                type="radio"
                name="salary"
                className="input-checkbox"
                value={activeSalaryRangId}
                id={each.salaryRangeId}
                onClick={this.onChangeRadio}
              />
              <label className="input-label" htmlFor={each.salaryRangeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderJobsListView = () => {
    const {searchInput, jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div className="jobs-list-container">
        <div className="desktop-input-container">
          <input
            type="search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            className="search-input"
          />
          <button
            type="button"
            onClick={this.onClickSearchIcon}
            data-testid="searchButton"
            className="search-button"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="jobs-ul-container">
          {jobsList.map(eachJob => (
            <JobCard key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-container">
        <div className="desktop-input-container">
          <input
            type="search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            className="search-input"
          />
          <button
            type="button"
            onClick={this.onClickSearchIcon}
            data-testid="searchButton"
            className="search-button"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-para">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
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

  renderApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return (
          <div className="products-list-container">
            <div>{this.renderFilterView()}</div>
            <div>{this.renderJobsListView()}</div>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return this.renderApiStatus()
  }
}

export default AllJobsSection
