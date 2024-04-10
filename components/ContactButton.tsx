import { Button } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import React, { useCallback } from "react";

import { GET_GENERAL_INFO } from "@/queries";
import { Get_General_InfoQuery } from "@/__generated__/graphql";

const ContactButton = ({ children }: { children?: React.ReactNode }) => {
  const { data: generalInfoData } = useQuery<Get_General_InfoQuery>(GET_GENERAL_INFO);

  const onContactHandler = useCallback(() => {
    const hotline = generalInfoData?.blockcodes?.nodes[0]?.generalInfo?.hotline as
      | string
      | undefined;

    if (!hotline) return;

    window.open(`tel:${hotline}`, "_self");
  }, [generalInfoData]);

  return <Button onClick={onContactHandler}>{children ?? "Liên hệ tư vấn"}</Button>;
};

export default ContactButton;
