#!/bin/bash
# echo $2
case $2 in
    'ensemble')
        # echo ensemble
        python runEnsemble.py
    ;;
    'facialFeatures')
        # echo facial
        python runFacialFeatures.py
    ;;
    'demography')
        # echo 'demo'
        python runDemography.py
    ;;
esac
# conda activate tf_gpu
# echo 'came to pipeline '
# python /home/hicup/Documents/famnit/depression_analysis_main/dataset/analysis/automateAffectiva.py $1
# echo 'ran the script'
# python /home/hicup/Documents/famnit/depression_analysis_main/dataset/analysis/pipeline.py #&> ./pipeline.log
# echo 'ran pipeline'