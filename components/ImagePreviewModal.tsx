import {
  Box,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import router from "next/router";
import { FiX } from "react-icons/fi";
import { ImageData } from "../unsplash";
import { ImagePreview } from "./ImagePreview";

export const ImagePreviewModal = (props: ImagePreviewModalProps) => {
  return (
    <Modal
      onClose={() => router.push("/", undefined, { shallow: true })}
      size="full"
      isOpen={!!router.query.id}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent minH="95vh" h="100%" bottom="-5vh">
        <ModalHeader w="100%" pt={0} pl={0} pr={0} pb={{ base: 4, md: 10 }}>
          <Box
            maxW="80rem"
            w="100%"
            display="flex"
            justifyContent="flex-end"
            ml="auto"
            mr="auto"
            mb={{ base: 0, md: -2 }}
          >
            <IconButton
              aria-label="Close"
              icon={<FiX />}
              as={ModalCloseButton}
              variant="outline"
              right={{ base: 2, md: 8 }}
              top={{ base: 2, md: 4 }}
            />
          </Box>
        </ModalHeader>
        <ModalBody pl={0} pr={0} pt={0} h="100%">
          <ImagePreview imageData={props.imageData} offline={props.offline} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export type ImagePreviewModalProps = {
  imageData: ImageData;
  offline: boolean;
};
