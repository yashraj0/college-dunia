import React, {useState, useEffect, Fragment} from 'react';
import getAPI from './../util/api.js'

const App = () => {

  //set loader for the very first render after a reload
  const [loader, setLoader] = useState(true)
  const [colleges, setColleges] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchData()
  }, [page])

  const fetchData = async () => {
    let data = await getAPI(page)
    setLoader(false)
    if(data && data.length) {
      //10 records are returned from each api call
      //add the response to the already existing array
      setColleges([...colleges, ...data])
    }
  }

  const setUpScrolling = () => {
    window.onscroll = () => {
      // console.log('---------------------------------------')
      // console.log('innerHeight : ', window.innerHeight)
      // console.log('scrollY : ', window.scrollY)
      // console.log('offset : ', document.body.offsetHeight)
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // do the api stuff
        // console.log('at the bottom')
        setPage(page+1)
      }
    }
  }
  setUpScrolling()

  const renderCollege = (college) => {
    if(!college) return
    return (
      <div className='college'>
        {
          college.promoted ? (
            <div className='promoted_tag'>
              promoted
            </div>
          ) : null
        }
        <div className='college_top'>
          <img src={require(`./../assets/images/${college.image}`)} alt='college_bg' />
          <div className='college_image_overlay'>
            {
              college.rating ? (
                <div className='rating'>
                  <div className='mb_02 text_align_center'>
                    <span className='f_w_500' style={{fontSize:'20px'}}>
                      {college.rating}
                    </span>
                    <span className='f_14'>/5</span>
                  </div>
                  <div className='f_12 text_align_center'>
                    {college.rating_remarks ? college.rating_remarks : null}
                  </div>
                </div>
              ) : null
            }
            <div className='tags_ranking'>
              <div className='row_flex flex_wrap'>
                {
                  college.tags.map((tag, index) => {
                    return (
                      <div className='tag' key={index}>
                          {tag}
                      </div>
                    )
                  })
                }
              </div>
              <div className='f_12 fw_500 color_white flex_shrink_zero'>
                {college.ranking ? college.ranking : null}
              </div>
            </div>
          </div>
        </div>
        <div className='college_bottom'>
          <div className='college_info'>
            <div>
              <div>
                <span className='f_18 f_w_600 color_dark_grey'>
                  {college.college_name}
                </span>
                <span>
                  {/*stars and stuff*/}
                </span>
              </div>
              
              <div className='row_flex flex_wrap mt_05 f_12'>
                {
                  college.nearest_place.map((place, index) => {
                    return (
                      <div key={index} className={`${index === 0 ? 'color_dark_grey' : 'color_grey'} mr_02`}>
                        {place} 
                        { index === college.nearest_place.length-1 ? null : ' |' }
                      </div>
                    )
                  })
                }
              </div>
              
              <div className='row_flex flex_wrap mt_05 f_12'>
                <span className='color_green f_w_700 mr_02'>{'93% match : '}</span>
                <span className='color_dark_grey '>{college.famous_nearest_places}</span>
              </div>
            </div>

            <div className='flex_shrink_zero text_align_right'>
              <div className='row_flex flex_jcfe flex_aic f_12'>
                {/* original fee*/}
                {
                  college.original_fees ? (
                    <span className='color_dark_grey'>
                      <strike>₹{college.original_fees}</strike>
                    </span>
                  ) : null
                }
                {/* discount */}
                {
                  college.discount ? (
                    <div className='discount'>
                      { college.discount }
                    </div>
                  ) : null
                }
              </div>

              {/* discounted fee red */}
              {
                college.discounted_fees ? (
                  <div className='fees mt_02'>
                    ₹{college.discounted_fees}
                  </div>
                ) : null
              }

              {/* duration */}
              {
                college.fees_cycle ? (
                  <div className='color_dark_grey f_12 mt_02'>
                    {college.fees_cycle}
                  </div>
                ) : null
              }
            </div>
          </div>

          <div className='row_flex flex_aic flex_jcsb mt_05 mb_05'>
            <div className='login_banner color_green f_w_600 f_14'>
              {college.offertext}
            </div>
            <div className='amenities row_flex flex_jcfe flex_wrap pr_1'>
              {
                college.amenties.map((amenity, index) => (
                  <div 
                    className={`${index === 0 ? '' : 'amenity'} f_14 color_green f_w_600`}
                    key = {index}
                  >
                    { amenity }
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderRows = () => {
    let len = colleges.length
    let arr = []
    //each row has two colleges
    for(let i=0; i<len; ) {
      arr.push(
        <div key={i} className = 'college_row'>
          {
            renderCollege(colleges[i])
          }
          {
            renderCollege(colleges[i+1])
          }
        </div>
      )
      i = i+2
    }
    return arr
  }

  return (
    <div className='main'>
      <div className='p_2 color_dark_grey f_w_500 f_18'>
        { loader ? 'Fetching records...' : 'Colleges in North India' }
      </div>
      {renderRows()}
    </div>
  )

}

export default App;
