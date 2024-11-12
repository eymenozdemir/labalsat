import React from 'react'

const Container = ({ id, class1, children }) => {
  let res;

  if (id) {
    res = (
      <section id={id} className={class1}>
        <div className="container-xxl">
            {children}
        </div>
      </section>
    )
  } else {
    res = (
      <section className={class1}>
        <div className="container-xxl">
            {children}
        </div>
      </section>
    )
  }

  return res;
}

export default Container