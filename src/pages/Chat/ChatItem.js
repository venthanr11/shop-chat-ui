import { Box, Flex } from "reflexbox"
import { PrimaryText } from "../../components/Typography"

const ChatItem = ({ name, message, timestamp, urls, sent }) => {

    const imagePresent = urls && urls.size > 0

    const style = {borderRadius: 16, padding:8, width:260, marginRight:16, marginLeft:16,backgroundColor: sent ? "#f7e1e1" : "#baf5d4", alignSelf: sent? 'end' : 'start'}


    return (
        
        <Flex width={1} flexDirection="column" marginBottom= {2} >
            <Box style={style}>
            <PrimaryText size={12} >
                {name}
            </PrimaryText>

            {imagePresent && <img src={urls[0]}  style={{height: 160, width:160, }} />}

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