import { Button, Flex, Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import React from "react"
import Link from 'next/link'
import { Profile } from "../models/Setting";
import { ProfilePage } from "./profile";
import { asPage } from "../components/templates/Page";
import { onSnapshot, castToSnapshot } from "mobx-state-tree";
import { useLocalStorage } from "../hooks";

const initialState = {
  name: "Mike Preston",
  sections:
  {
    "Account": {
      name: 'Account',
      settings:
      {
        "is_dev": {
          name: "Dev Mode",
          enabled: process.env.NODE_ENV === 'development'
        },
        "is_dark_mode": {
          name: "Dark Mode",
        },
        "show_out_of_stock": {
          name: "Show Out of Stock",
        },
      }
    }
    ,
    "Billing": {
      name: 'Billing',
      settings:
      {
        "show_account_num": {
          name: "Show Account Number"
        }
      }
    }
  }
}

// const profile = Profile.create(initialState)

export const Home = asPage()(() => {

  const [storedProfile, setProfile] = useLocalStorage('profile', undefined); // Must be undefined, or TS complains.
  let profile = Profile.create(castToSnapshot(storedProfile))

  onSnapshot(profile, profileSnapshot => {
    setProfile(profileSnapshot)
  })

  return (
    <Flex justify="center">
      <Stack>
        <Heading
          bg='teal.100'
          color='pink.300'
        >
          Kiyapp
        </Heading>

        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          isLazy
        >
          <TabList>
            <Tab>Wishlist</Tab>
            <Tab>Schools</Tab>
            <Tab>Settings</Tab>
          </TabList>
          <TabPanels>

            <TabPanel>
              <Link href="/wishlist">
                <Button colorScheme="blue">Wishlist</Button>
              </Link>
            </TabPanel>

            <TabPanel>
              <Link href="/school">
                <Button colorScheme="blue">Schools</Button>
              </Link>
            </TabPanel>

            <TabPanel>
              <ProfilePage profile={profile} />
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Stack>
    </Flex >
  )
})

export default Home



