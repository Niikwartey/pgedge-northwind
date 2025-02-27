"use client";

import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";

import {
  Flex,
  ColorSchemeScript,
  MantineProvider,
  Burger,
  AppShell,
  Box,
  Image,
  Text,
  rem,
  Container,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState, useEffect } from "react";
import { NavbarSimple } from "./components/NavbarSimple/NavbarSimple";
import { UserInfo, DbInfo, getUserInfo, getDbInfo } from "./data/api";
import { DbInfoContext, UserInfoContext } from "./context";

export default function Document({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [dbInfo, setDbInfo] = useState<DbInfo | null>(null);

  useEffect(() => {
    const fetchDbInfo = async () => {
      setDbInfo(await getDbInfo());
    };
    const fetchUserInfo = async () => {
      setUserInfo(await getUserInfo());
    };

    fetchDbInfo();
    fetchUserInfo();
  }, []);

  return (
    <>
      <html lang="en">
        <head>
          <ColorSchemeScript />
          <title>pgEdge Northwind Traders Demo</title>
          <link rel="icon" href="/favicon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
        </head>
        <body>
          <MantineProvider
            theme={{
              primaryColor: "cyan",
              fontSizes: {
                xs: rem(14),
                sm: rem(16),
                md: rem(18),
                lg: rem(20),
                xl: rem(22),
              },
            }}
          >
            <UserInfoContext.Provider value={userInfo}>
              <DbInfoContext.Provider value={dbInfo}>
                <AppShell
                  header={{ height: 50 }}
                  navbar={{
                    width: 300,
                    breakpoint: "sm",
                    collapsed: { mobile: !opened },
                  }}
                  padding="md"
                >
                  <AppShell.Header>
                    <Flex align="center" h={50}>
                      <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="md"
                        pl="sm"
                      />
                      <Text pl="sm" size={"md"} span={true}>
                        <strong>Northwind</strong> Traders
                      </Text>
                      <Flex align="center" ml="auto">
                        <Text size="xs" fw={500} visibleFrom="md">
                          Powered By
                        </Text>
                        <Container pl={5}>
                          <Image
                            src={`/pgedge-cloud-logo.png`}
                            h={30}
                            alt="pgEdge logo"
                            ml="auto"
                          />
                        </Container>
                      </Flex>
                    </Flex>
                  </AppShell.Header>

                  <AppShell.Navbar p="md">
                    <NavbarSimple onClick={toggle}></NavbarSimple>
                  </AppShell.Navbar>

                  <AppShell.Main>
                    {" "}
                    <Box py="lg" px="md">
                      {children}
                    </Box>
                  </AppShell.Main>
                </AppShell>
              </DbInfoContext.Provider>
            </UserInfoContext.Provider>
          </MantineProvider>
        </body>
      </html>
    </>
  );
}
