import { Box, Flex } from "reflexbox"
import { PrimaryText } from "../../components/Typography"

const ChatItem = ({ name, message, timestamp, urls }) => {

    const imagePresent = urls && urls.size > 0

    return (
        <Flex width={1} flexDirection="column" marginBottom= {2} >
            <Box  backgroundColor={"#baf5d4"} style={{borderRadius: 16, padding:8, width:260, marginLeft:16}}>
            <PrimaryText size={12} >
                {name}
            </PrimaryText>

            {imagePresent && <img src={urls[0]}  style={{height: 160, width:160}} />}

            <PrimaryText size={16} style={{fontWeight: 'bold', flexGrow:1}}>
                {message}
            </PrimaryText>

            <PrimaryText size={10} style={{marginLeft:190}} >
                {timestamp}
            </PrimaryText>
            </Box>

        </Flex>
    )

}

export default ChatItem