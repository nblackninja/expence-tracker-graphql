import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import InlineSVG from 'react-inlinesvg'
import styles from './NavItem.module.scss'

const pathIcon = '/images/icons/nav'

export const NavItem = ({ link }) => (
  <NavLink
    to={`/${link.to}`}
    title={link.title}
    className={styles.link}
    activeClassName={styles.activeLink}
    exact
  >
    <InlineSVG
      className={styles.icon}
      src={`${pathIcon}/${link.iconName}.svg`}
      loader={<p>{link.loader}</p>}
    />
  </NavLink>
)

NavItem.propTypes = {
  link: PropTypes.exact({
    id: PropTypes.number,
    to: PropTypes.string,
    title: PropTypes.string,
    iconName: PropTypes.string,
    loader: PropTypes.string
  })
}
