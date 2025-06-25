// React Imports
import type { ReactElement } from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Type Imports
import type { Data, ProjectTableRowType } from '@/types/pages/profileTypes'

// Component Imports
import UserProfile from '@views/pages/user-profile'

// Data Imports
import { getCurrentUserOdooProfile } from '@/app/server/actions'

const ProfileTab = dynamic(() => import('@views/pages/user-profile/profile'))
const TeamsTab = dynamic(() => import('@views/pages/user-profile/teams'))
const ProjectsTab = dynamic(() => import('@views/pages/user-profile/projects'))
const ConnectionsTab = dynamic(() => import('@views/pages/user-profile/connections'))

const tabContentList = (data?: any): { [key: string]: React.ReactElement } => ({
  profile: <ProfileTab data={data?.users.profile} />, // About/Overview
  teams: <TeamsTab data={data?.users.teams} />,
  projects: <ProjectsTab data={data?.users.projects} />,
  connections: <ConnectionsTab data={data?.users.connections} />
})

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/pages/profile` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getProfileData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/pages/profile`)

  if (!res.ok) {
    throw new Error('Failed to fetch profileData')
  }

  return res.json()
} */

// Default profile data jika tidak ada data user
const getDefaultProfileData = () => {
  const defaultProfileHeader = {
    fullName: 'Guest User',
    coverImg: '/images/pages/profile-cover.png',
    location: '-',
    profileImg: '/images/avatars/1.png',
    joiningDate: '-',
    designation: '-',
    designationIcon: 'tabler-crown'
  }

  return {
    users: {
      profile: {
        about: [],
        contacts: [],
        overview: [],
        teams: [],
        connections: [],
        teamsTech: [],
        projectTable: []
      },
      teams: [],
      projects: [],
      connections: []
    },
    profileHeader: defaultProfileHeader
  }
}

const mapOdooToProfileData = (user: any) => {
  // Default fallback jika user tidak valid
  if (!user || typeof user !== 'object') {
    return getDefaultProfileData()
  }

  // Mapping Odoo ke struktur Data & ProfileHeaderType
  const profileHeader = {
    fullName: user.name ?? '-',
    coverImg: '/images/pages/profile-cover.png',
    location: user.city ? `${user.city}, ${user.country}` : (user.country ?? '-'),
    profileImg: user.avatar ?? '/images/avatars/1.png',
    joiningDate: user.birthday ?? '-',
    designation: user.function ?? user.title ?? user.company ?? '-',
    designationIcon: 'tabler-crown'
  }

  const about = [
    { property: 'Full Name', value: user.name?.toString() ?? '-', icon: 'tabler-user' },
    { property: 'Email', value: user.email?.toString() ?? '-', icon: 'tabler-mail' },
    { property: 'Login', value: user.login?.toString() ?? '-', icon: 'tabler-user-circle' },
    { property: 'Company', value: user.company?.toString() ?? '-', icon: 'tabler-building' },
    { property: 'Country', value: user.country?.toString() ?? '-', icon: 'tabler-flag' },
    { property: 'City', value: user.city?.toString() ?? '-', icon: 'tabler-building-skyscraper' },
    { property: 'Language', value: user.lang?.toString() ?? '-', icon: 'tabler-language' },
    { property: 'Timezone', value: user.timezone?.toString() ?? '-', icon: 'tabler-clock' },
    { property: 'Status', value: user.active ? 'Active' : 'Inactive', icon: 'tabler-check' }
  ]

  const contacts = [
    { property: 'Phone', value: user.phone?.toString() ?? '-', icon: 'tabler-phone' },
    { property: 'Mobile', value: user.mobile?.toString() ?? '-', icon: 'tabler-device-mobile' },
    { property: 'Website', value: user.website?.toString() ?? '-', icon: 'tabler-world' },
    { property: 'Street', value: user.street?.toString() ?? '-', icon: 'tabler-road' },
    { property: 'Zip', value: user.zip?.toString() ?? '-', icon: 'tabler-mailbox' }
  ]

  const overview = [
    {
      property: 'Group',
      value: Array.isArray(user.groups) ? user.groups.join(', ') : (user.groups?.toString() ?? '-'),
      icon: 'tabler-users-group'
    }
  ]

  // Dummy project table untuk testing
  const dummyProjectTable: ProjectTableRowType[] = []

  return {
    users: {
      profile: {
        about: about ?? [],
        contacts: contacts ?? [],
        overview: overview ?? [],
        teams: [],
        connections: [],
        teamsTech: [],
        projectTable: dummyProjectTable
      },
      teams: [],
      projects: [],
      connections: []
    },
    profileHeader
  }
}

const ProfilePage = async () => {
  // Ambil data user Odoo yang sedang login
  const user = await getCurrentUserOdooProfile()
  const data = user && !user.error ? mapOdooToProfileData(user) : getDefaultProfileData()

  return <UserProfile data={data} tabContentList={tabContentList(data)} />
}

export default ProfilePage
