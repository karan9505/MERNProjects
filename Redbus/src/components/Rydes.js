import React, { Component } from 'react'
import '../styles/styleRydes.css'

class Rydes extends Component {
  render() {
    return (
      <section className='ryde'>
        <div className='adjust_top'></div>
        <div className='ryde_section1'>
            <div className='section1_container'>
                <div className='section1_part1'>
                    <img src='https://www.redbus.in/bushire/static/icons/ryde.svg' alt='ryde'/>
                </div>
                <div className='section1_part2'>
                    <div className='ryde_text'>
                        <h1>Rent Cabs, Tempo Travellers &<br/>Buses with best drivers</h1>
                    </div>
                </div>
                <div className='section1_part3'></div>
            </div>
        </div>
        <div className='ryde_section2'>
            <div className="ryde_section2_container">
                <div className="section2_part1">
                    <div className='text_experience'>
                        <h1>EXPERIENCE THE <br/><img src="https://www.redbus.in/bushire/static/mwebv2/srp/ryde-logo-white.svg" alt="/"/>PROMISE</h1>
                    </div>
                    <div className='experience_slots'>
                        <div className='slots_container'>
                            <div className="slot">
                                <div className='slot_img'>
                                    <img src=''alt='/'/>
                                </div>
                                <div className='slot_text'>
                                    <h1>Audited</h1>
                                    <p>Clean Cabs</p>
                                </div>
                            </div>
                            <div className="slot">
                                <div className='slot_img'>
                                    <img src=''alt='/'/>
                                </div>
                                <div className='slot_text'>
                                    <h1>Monitered</h1>
                                    <p>On-time pick-ups</p>
                                </div>
                            </div>
                            <div className="slot">
                                <div className='slot_img'>
                                    <img src=''alt='/'/>
                                </div>
                                <div className='slot_text'>
                                    <h1>Trained</h1>
                                    <p>Helpful drivers</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    )
  }
}

export default Rydes
