
echo "-- Build a card --"
echo "name:"
read name
echo "quantite:"
read quantite
echo "legendaire:"
read legendaire
echo "dual:"
read dual
echo "emplacement: (0:main/1:vetement/2:sacoche/3:aucun)"
read emplacement
echo "ouvre_porte:"
read ouvre_porte
if [ "${ouvre_porte:0:1}" -gt 0 ]; then
    echo "ouvre_porte_bruyant:"
    read ouvre_porte_bruyant
else
    ouvre_porte_bruyant=0
fi
echo "bruyante:"
read bruyante
echo "portee:"
read portee
echo "des:"
read des
echo "precision:"
read precision
echo "degats:"
read degats
echo "description:"
read description

json_data="{
    \"name\": \"$name\",
    \"quantite\": $quantite,
    \"legendaire\": $legendaire,
    \"dual\": $dual,
    \"emplacement\": $emplacement,
    \"ouvre_porte\": $ouvre_porte,
    \"ouvre_porte_bruyant\": $ouvre_porte_bruyant,
    \"bruyante\": $bruyante,
    \"portee\": $portee,
    \"des\": $des,
    \"precision\": $precision,
    \"degats\": $degats,
    \"description\": \"$description\"
}"

echo "$json_data" > "$name".zcs
