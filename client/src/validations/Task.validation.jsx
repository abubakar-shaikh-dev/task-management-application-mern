import * as yup from "yup";

export function TaskSchema() {
  return yup.object({
    title:yup.string().required("Title is Required!"),
    status:yup.string().required("Status is Required!"),
    description:yup.string().required("Description is Required!"),
  }).required()
}