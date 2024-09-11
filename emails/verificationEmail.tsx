import {
    Html ,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button
} from "@react-email/components";


interface VerificationEmailProps{
    username : string,
    otp : string
}

export default function verificationEmail({username , otp}:VerificationEmailProps){
    return(
        <Html lang="en" dir="ltr">
            <Head>
                <title>Verification Code</title>
                <Font 
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont = {{
                        url : "",
                        format:"woff2"
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>

            <Preview>Here&apos;s Your Verification Code : {otp} </Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {username},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank You for Registering . Please Use the following Verifiacation Code to complete your registartion:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>
                        If you did not request this code , please ignore this email
                    </Text>
                </Row>

                {/* <Row>
                    <Button
                        href=""
                        style={{color : '#61dafb'}}
                    >
                        Verify Here
                    </Button>
                </Row> */}
            </Section>

        </Html>
    )
}