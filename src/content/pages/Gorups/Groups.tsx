import { Container } from "@mui/material";
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async";
import GroupTable from "src/components/GroupTable";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { PermissionMiddleWares } from "src/middlewares/PermissionMiddleWare";
import { GroupDetail } from "src/models/group";
import { useRequest } from "src/utils/request";


const Groups = () => {

    const [resquestLoading, setRequestLoading] = useState(true);
    const [groupsData, setGroupsData] = useState<GroupDetail[]>([]);

    const {getGroups} = useRequest();

    const handleGetGroups = async() => {
        const response = await getGroups();

        setGroupsData(response.data.groups);
        setRequestLoading(false);

    }

    useEffect(() => {
        handleGetGroups();
    }, [])


    return (
       <PermissionMiddleWares codeName="view_group">
          <>
            <Helmet>
                <title>Grupos</title>                
            </Helmet>

            <PageTitleWrapper>
                <PageTitle
                    heading="Grupos"
                    subHeading="Consulte cargos das Empresas e execute ações"
                />               

            </PageTitleWrapper>

          </>

          <Container maxWidth="xl" sx={{
                marginX: resquestLoading ? "-4%" : 0,
                transition: "all .5s",                            
                
            }}>
                <GroupTable
                    refreshList={handleGetGroups}
                    groupList={groupsData}
                />

          </Container>
       </PermissionMiddleWares>
    )
}

export default Groups