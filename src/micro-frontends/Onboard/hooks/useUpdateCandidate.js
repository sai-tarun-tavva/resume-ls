import { useSelector } from "react-redux";
import { useLoading, useStatus } from "../../../store";
import { addOnboardCandidate, resetStatusAsync } from "../../../utilities";
import { CONTENT, STATUS_CODES } from "../../../constants";

export const useUpdateCandidate = () => {
  const { updateStatus, resetStatus } = useStatus();
  const { isLoading, enableFetchLoading, disableFetchLoading } = useLoading();
  const { data } = useSelector((state) => state.input);
  let isAPICallSuccessful = true;

  const updateCandidate = async () => {
    if (isLoading.fetch) {
      isAPICallSuccessful = false;
      return isAPICallSuccessful;
    }

    await resetStatusAsync(resetStatus);

    enableFetchLoading();

    const newCandidate = {
      firstName: data.personal.firstName,
      lastName: data.personal.lastName,
      emailId: data.personal.emailId,
      phoneNumber: data.personal.phoneNumber,
      status: data.onboarding.status,
      review: data.miscellaneous.remarks,
      visaStatus: data.personal.visaStatus,
      additional_info: {
        other_info: data,
      },
    };
    const { status } = await addOnboardCandidate(newCandidate);

    if (status !== STATUS_CODES.SUCCESS) {
      isAPICallSuccessful = false;
      updateStatus({
        message: CONTENT.COMMON.serverError,
        type: "failure",
      });
    }

    disableFetchLoading();

    return isAPICallSuccessful;
  };

  return { updateCandidate };
};
