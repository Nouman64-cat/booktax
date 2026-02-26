FROM public.ecr.aws/lambda/python:3.12

# Copy requirements and install dependencies
COPY requirements.txt ${LAMBDA_TASK_ROOT}
RUN pip install -r requirements.txt

# Copy all application files (handler, scrapers, chunker, config)
COPY . ${LAMBDA_TASK_ROOT}

# Set the CMD to your Lambda handler function
CMD [ "handler.lambda_handler" ]